param($chop = 300, $baseRatio = 60)

Write-Host "audio ticket prep..."

Get-Location 
# Set-Location "./dls"

$srcImg = "./dls/ticket-audio.png"

if ((Test-Path $srcImg) -eq $false) {
  throw "errro"
}

Write-Host "Get-Location"
Write-Host ">> src: $srcImg"


$outDir = Resolve-Path "./static/img"

if ((Test-Path $outDir) -eq $false) {
  throw "no dir"
}

$compositeOut = Join-Path -Path $outDir -ChildPath "ticket-audio-800.png"

Write-Host "compositeOut: $compositeOut"
& "convert" @("xc:red", "red.png")
# if ((Test-Path $compositeOut) -eq $false) {
#   throw "error"
# }


& convert @("./dls/ticket-audio.png", 
  "-strokewidth", "0",
  "-fill", "rgba( 0, 0, 0 , 1 )", 
  "-draw", "rectangle 1650, 960, 460,200",  

  "-scale", "800x", $compositeOut) #"./static/img/tester.png")

# & "convert" @($srcImage, 
#   # "-strokewidth", "0",
#   # "-fill", "rgba( 255, 215, 0 , 0.5 )", 
#   # "-draw", "rectangle 66,50 200,150",  
#   "-scale", "800x" 
#   $compositeOut )

# & "composite" @("-gravity", "center", "-colorspace", "sRGB", $innerBox, $srcImage, $compositeOut)

# crop top and bottom and scale to be 2000px wide...
# & "convert" @($srcImg, 
#   "-gravity", "North", "-chop", "x$chop", 
#   "-gravity", "South", "-chop", "x$chop", 
#   "-scale", "2000x"
#   $choppedSrc) 

# $dimensions = & "identify" @("-ping", "-format", "%wx%h", $choppedSrc)
# # 1. create the bg
# Write-Host $dimensions
# $bg = Join-Path $outDir -ChildPath "bg.jpg"

# & "convert" @("-size", $dimensions, "xc:black" , $bg)
# $bgTest = Test-Path $bg
# Write-Host $bgTest


# $array = @(1400, 1600, 1800, 2000)

# for ($i = 0; $i -lt $array.Count; $i++) {
#   Write-Host $array.Get($i)

#   $scale = $array.Get($i)
#   $out = Join-Path  -Path $outDir -ChildPath "$scale.jpg"

#   $compositeOut = Join-Path -Path $outDir -ChildPath "comp-$scale.jpg"
#   $compSliced = Join-Path -Path $outDir -ChildPath "slice-$scale.jpg"
#   Write-Host "out: $out"
#   Write-Host "out: $compositeOut"
#   Write-Host "create the overlay image..."
#   & "convert" @($choppedSrc, "-scale", "$($scale)x", $out)
#   & "composite" @("-gravity", "center", "-colorspace", "sRGB", $out, $bg, $compositeOut)


#   # $r = $baseRatio * ($scale / 2000)

#   # Write-Host "ratio: $r"
#   & "convert" @("-crop", "100%x$baseRatio%", $compositeOut, $compSliced) 
# }
