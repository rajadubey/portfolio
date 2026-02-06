/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { Metadata } from 'next'

// Admin UI is intentionally disabled in Upstash-only mode.

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: 'Admin - Portfolio CMS',
    description: 'Admin panel for portfolio management'
  }
}

const Page = async () => {
  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ color: '#ef4444', marginBottom: '1rem' }}>
        Admin Panel Temporarily Unavailable
      </h1>
      
      <div style={{ 
        backgroundColor: '#fef2f2', 
        border: '1px solid #fecaca',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <h2 style={{ marginTop: 0, fontSize: '1.25rem' }}>Why is this disabled?</h2>
        <p>
          The legacy admin panel is disabled because this project now uses Upstash Redis
          as the content store.
        </p>
        <p>Content is managed through seed scripts and Redis keys.</p>
      </div>

      <div style={{ 
        backgroundColor: '#f0f9ff', 
        border: '1px solid #bae6fd',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        <h2 style={{ marginTop: 0, fontSize: '1.25rem' }}>Workarounds</h2>
        <ol style={{ marginBottom: 0 }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Use Upstash Redis Console</strong> to inspect or update stored content
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Run the seed script</strong> to populate initial data: <code>npm run seed</code>
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Update seed data</strong> in <code>src/scripts/seed.ts</code> and run <code>npm run seed:upstash</code>
          </li>
        </ol>
      </div>

      <div style={{ 
        backgroundColor: '#f0fdf4', 
        border: '1px solid #bbf7d0',
        borderRadius: '8px',
        padding: '1.5rem'
      }}>
        <h2 style={{ marginTop: 0, fontSize: '1.25rem' }}>Current Status</h2>
        <ul style={{ marginBottom: 0 }}>
          <li>✅ Data fetching works from Upstash Redis</li>
          <li>✅ Seed script populates sample data</li>
          <li>✅ Production build succeeds</li>
          <li>ℹ️ Admin UI intentionally disabled</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
          <strong>Note:</strong> This project runs in an Upstash-only data mode. The public site works without a CMS admin runtime.
        </p>
      </div>
    </div>
  )
}

export default Page
