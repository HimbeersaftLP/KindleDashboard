# The Kindle's version of webkit has some problems with scaling SVGs, so we're converting them to png's using Inkscape

Get-ChildItem -Include ('*.svg') -Recurse | 
Foreach-Object {
    $newName = $_.FullName -replace '\.svg$',''
    $newName = "$newName.png"
    echo Converting file $_.FullName
    &"C:\Program Files\Inkscape\inkscape.exe" --export-png=$newName --export-background-opacity=0 --without-gui $_.FullName
}