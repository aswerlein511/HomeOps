import { Button } from '@/ui/button';

export default function Header() {
    return (
        <header className='app-header' data-test='layout-header'>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                }}
            >
                <h2
                    style={{
                        margin: 0,
                    }}
                >
                    🏠 HomeOps
                </h2>

                <span className='text-muted'>Local Automation Platform</span>
            </div>

            <Button variant='secondary' dataTest='btn-connect'>
                Connect
            </Button>
        </header>
    );
}
