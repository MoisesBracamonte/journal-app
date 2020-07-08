export const rewriteImage = (file, id)  => {
    var image = file.name.split(".");
    image = `${ id }.${ image[ image.length - 1 ]}`;
    var blob = file.slice(0, file.size, 'image/png'); 
    return new File([blob], image, {type: 'image/png'});
}