// Shared head files for all pages 


// function getRootFilePath(rootFile) {
//   /* Returns a string of path to rootFile

//   Parameters:
//   rootFile (string): name of file in root

//   Returns:
//   (string): path to rootFile from current directory
//   */

//     var folders = window.location.pathname.split('/');
//     console.log(folders);
//     document.write(folders);
//     folders.pop();
//     var rootName = "haploman";
//     var parentString = "";
//     while (folders.pop() !== rootName) {
//       parentString += "../";
//     }

//     var pathToRootFile = parentString + rootFile;
//     return pathToRootFile;
// }

document.write(
 '<!-- Required meta tags -->\
 <meta charset="utf-8">\
 <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=yes">\
 <meta name="author" content="Benjamin Gutierrez">\
 \
 <!-- Favicon -->\
 <link rel="icon" href="https://drive.google.com/uc?export=view&id=11b0YtsxHhqw7KIzV239aschfVTan7It-">\
 \
 <!-- Google Fonts -->\
 <link href="https://fonts.googleapis.com/css2?family=Josefin+Slab:ital,wght@0,100;0,300;0,400;0,600;0,700;1,100;1,300;1,400;1,600;1,700&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">\
 \
 <!-- Bootstrap CSS -->\
 <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">\
 \
 <!-- External Universal Stylesheet -->\
 <link rel="stylesheet" type="text/css" href="https://haploman.com/shared-resources/shared-styles.css">\
\
 <!-- Global site tag (gtag.js) - Google Analytics -->\
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-168040169-1"></script>\
<script>\
  window.dataLayer = window.dataLayer || [];\
  function gtag(){dataLayer.push(arguments);}\
  gtag("js", new Date());\
\
  gtag("config", "UA-168040169-1");\
</script>');