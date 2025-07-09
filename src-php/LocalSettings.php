# End of automatically generated settings.
# Add more configuration options below.
$path = $_SERVER['REQUEST_URI'];

if (preg_match('#/en$#', $path)) {
    $wgLanguageCode = 'en';
} elseif (preg_match('#/es$#', $path)) {
    $wgLanguageCode = 'es';
} elseif (preg_match('#/pt$#', $path)) {
    $wgLanguageCode = 'pt';
}
