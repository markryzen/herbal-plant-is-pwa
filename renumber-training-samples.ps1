# Renumbers ALL image files inside every training-samples/<plant> subfolder
# into sequential 1.jpg, 2.jpg, 3.jpg... so every photo you added gets used
# for AI training (not just files that already happened to be named 1-5/6.jpg).
#
# HOW TO RUN:
#   1. Open PowerShell
#   2. cd into the training-samples folder, e.g.:
#      cd "C:\Users\Patty\Downloads\herbal-plant-is-pwa\herbal-pwa\training-samples"
#   3. Run this script:
#      powershell -ExecutionPolicy Bypass -File "C:\path\to\renumber-training-samples.ps1"
#      (or just paste its contents directly into PowerShell)

$imageExtensions = @(".jpg", ".jpeg", ".png", ".webp")

Get-ChildItem -Directory | ForEach-Object {
    $folder = $_.FullName
    $folderName = $_.Name

    # Get all image files in this plant folder, in a stable order
    $files = Get-ChildItem -Path $folder -File | Where-Object { $imageExtensions -contains $_.Extension.ToLower() } | Sort-Object Name

    if ($files.Count -eq 0) {
        Write-Host "SKIP (no images): $folderName"
        return
    }

    Write-Host "Processing $folderName ($($files.Count) images)..."

    # Step 1: rename everything to a temporary unique name to avoid collisions
    # (e.g. so an existing "1.jpg" doesn't block renaming another file TO "1.jpg")
    $i = 0
    $tempNames = @()
    foreach ($f in $files) {
        $i++
        $tempName = "__temp_$i" + $f.Extension
        Rename-Item -Path $f.FullName -NewName $tempName -ErrorAction SilentlyContinue
        $tempNames += (Join-Path $folder $tempName)
    }

    # Step 2: rename temp files to final sequential .jpg names: 1.jpg, 2.jpg, ...
    $n = 0
    foreach ($tempPath in $tempNames) {
        $n++
        $finalName = "$n.jpg"
        if (Test-Path $tempPath) {
            Rename-Item -Path $tempPath -NewName $finalName -ErrorAction SilentlyContinue
        }
    }

    Write-Host "  -> renamed to 1.jpg through $n.jpg"
}

Write-Host ""
Write-Host "Done! Every plant folder now has sequential 1.jpg, 2.jpg, 3.jpg... files."
Write-Host "Next steps: git add . / git commit / git push, then reset+retrain the AI in the app."
