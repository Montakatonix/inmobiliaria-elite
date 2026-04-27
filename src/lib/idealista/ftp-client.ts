import FTP from 'ftp'

export async function downloadXMLFromFTP(): Promise<string> {
  return new Promise((resolve, reject) => {
    const client = new FTP()

    const host = process.env.IDEALISTA_FTP_HOST || 'ftp.idealista.com'
    const user = process.env.IDEALISTA_FTP_USER
    const password = process.env.IDEALISTA_FTP_PASSWORD
    const path = process.env.IDEALISTA_FTP_PATH || '/export/data.xml'

    if (!user || !password) {
      return reject(new Error('FTP credentials not configured'))
    }

    let xmlData = ''

    client.on('ready', () => {
      console.log('[FTP] Connected to Idealista FTP')

      client.get(path, (err, stream) => {
        if (err) {
          client.end()
          return reject(err)
        }

        stream.on('data', (chunk) => {
          xmlData += chunk.toString()
        })

        stream.on('end', () => {
          client.end()
          console.log(`[FTP] Downloaded ${xmlData.length} bytes`)
          resolve(xmlData)
        })

        stream.on('error', (err) => {
          client.end()
          reject(err)
        })
      })
    })

    client.on('error', (err) => {
      reject(err)
    })

    client.connect({
      host,
      user,
      password,
      connTimeout: 30000,
      pasvTimeout: 30000,
      keepalive: 10000,
    })
  })
}

export async function testFTPConnection(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const client = new FTP()

    const host = process.env.IDEALISTA_FTP_HOST || 'ftp.idealista.com'
    const user = process.env.IDEALISTA_FTP_USER
    const password = process.env.IDEALISTA_FTP_PASSWORD

    if (!user || !password) {
      return reject(new Error('FTP credentials not configured'))
    }

    client.on('ready', () => {
      console.log('[FTP] Connection test successful')
      client.end()
      resolve(true)
    })

    client.on('error', (err) => {
      console.error('[FTP] Connection test failed:', err.message)
      reject(err)
    })

    client.connect({
      host,
      user,
      password,
      connTimeout: 10000,
    })
  })
}
