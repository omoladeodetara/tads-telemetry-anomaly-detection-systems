# Function to check if a port is in use
function Test-Port {
    param(
        [int]$Port
    )
    
    try {
        $null = New-Object System.Net.Sockets.TcpClient -ArgumentList 'localhost', $Port
        return $true
    } catch {
        return $false
    }
}

# Function to find next available port
function Get-NextAvailablePort {
    param(
        [int]$StartPort
    )
    
    $port = $StartPort
    while (Test-Port -Port $port) {
        $port++
    }
    return $port
}

Write-Host "Starting TADS Development Servers..." -ForegroundColor Cyan

# Set environment variables for ports
$env:PORT = Get-NextAvailablePort -StartPort 4000
$env:NEXT_PORT = Get-NextAvailablePort -StartPort 3000

Write-Host "Backend will use port: $env:PORT" -ForegroundColor Green
Write-Host "Frontend will use port: $env:NEXT_PORT" -ForegroundColor Green

# Start backend server
$backendJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    $env:PORT = $using:env:PORT
    npm run dev
}

# Start frontend server
$frontendJob = Start-Job -ScriptBlock {
    Set-Location "$using:PWD\frontend"
    $env:PORT = $using:env:NEXT_PORT
    npm run dev
}

try {
    Write-Host "`nServers are starting..." -ForegroundColor Yellow
    Write-Host "Press Ctrl+C to stop both servers`n" -ForegroundColor Yellow
    
    # Show output from both jobs in real-time
    while ($true) {
        $backend = Receive-Job $backendJob
        $frontend = Receive-Job $frontendJob
        
        if ($backend) { 
            Write-Host $backend -ForegroundColor Gray
        }
        if ($frontend) {
            Write-Host $frontend -ForegroundColor Gray
        }
        
        Start-Sleep -Milliseconds 100
    }
}
finally {
    # Cleanup on Ctrl+C
    Write-Host "`nStopping servers..." -ForegroundColor Yellow
    Get-Job | Stop-Job
    Get-Job | Remove-Job
    Write-Host "Servers stopped" -ForegroundColor Green
}
