const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const AIRTABLE_BASE_ID = 'apphbarjTeh5hPNVD'
const AIRTABLE_TABLE_ID = 'tblQkfwMiYJaJtMRQ'
const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  const pat = Deno.env.get('AIRTABLE_PAT')
  if (!pat) {
    return new Response(JSON.stringify({ error: 'AIRTABLE_PAT not configured' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const { name, dosage, timeBlock } = await req.json()

    if (!name || !dosage) {
      return new Response(JSON.stringify({ error: 'Name and Dosage are required' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const res = await fetch(AIRTABLE_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${pat}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [{
          fields: {
            Name: name,
            Dosage: dosage,
            TimeBlock: timeBlock || 'Morning',
          },
        }],
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('Airtable error:', JSON.stringify(data))
      return new Response(JSON.stringify({ error: 'Airtable API error', details: data }), {
        status: res.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Edge function error:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
