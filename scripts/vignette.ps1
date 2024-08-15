param($chop = 300, $baseRatio = 60)

Write-Host "vignette prep..."

Get-Location 
# Set-Location "./dls"

$srcImg = "./dls/band-photo.jpg"

Write-Host ">> src: $srcImg"

$outDir = "./static/img/vignette"

if (Test-Path -PathType Container $outDir) {
  Remove-Item -Recurse $outDir
}


New-Item -Path "./static/img/vignette" -ItemType Directory

$choppedSrc = Join-Path -Path $outDir -ChildPath "src-chopped-$chop.jpg"


# crop top and bottom and scale to be 2000px wide...
& "convert" @($srcImg, 
  "-gravity", "North", "-chop", "x$chop", 
  "-gravity", "South", "-chop", "x$chop", 
  "-scale", "2000x"
  $choppedSrc) 

$dimensions = & "identify" @("-ping", "-format", "%wx%h", $choppedSrc)
# 1. create the bg
Write-Host $dimensions
$bg = Join-Path $outDir -ChildPath "bg.jpg"

& "convert" @("-size", $dimensions, "xc:black" , $bg)
$bgTest = Test-Path $bg
Write-Host $bgTest


$array = @(1400, 1600, 1800, 2000)

for ($i = 0; $i -lt $array.Count; $i++) {
  Write-Host $array.Get($i)

  $scale = $array.Get($i)
  $out = Join-Path  -Path $outDir -ChildPath "$scale.jpg"

  $compositeOut = Join-Path -Path $outDir -ChildPath "comp-$scale.jpg"
  $compSliced = Join-Path -Path $outDir -ChildPath "slice-$scale.jpg"
  Write-Host "out: $out"
  Write-Host "out: $compositeOut"
  Write-Host "create the overlay image..."
  & "convert" @($choppedSrc, "-scale", "$($scale)x", $out)
  & "composite" @("-gravity", "center", "-colorspace", "sRGB", $out, $bg, $compositeOut)


  # $r = $baseRatio * ($scale / 2000)

  # Write-Host "ratio: $r"
  & "convert" @("-crop", "100%x$baseRatio%", $compositeOut, $compSliced) 
}
