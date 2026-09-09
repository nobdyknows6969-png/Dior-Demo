Add-Type -AssemblyName System.Drawing

$srcPath = Join-Path (Get-Location) "reference.jpg"
$bmp = New-Object System.Drawing.Bitmap($srcPath)

function Crop-Image($rect, $outName) {
    $cropBmp = New-Object System.Drawing.Bitmap($rect.Width, $rect.Height)
    $g = [System.Drawing.Graphics]::FromImage($cropBmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $rect.Width, $rect.Height)
    $g.DrawImage($bmp, $destRect, $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()
    $cropBmp.Save((Join-Path (Get-Location) $outName), [System.Drawing.Imaging.ImageFormat]::Png)
    $cropBmp.Dispose()
    Write-Output "Saved $outName"
}

# Clean signatures
$r4 = New-Object System.Drawing.Rectangle(45, 912, 90, 40)
Crop-Image $r4 "section3_signatures.png"

$bmp.Dispose()
