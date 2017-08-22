// Dropzones

    // access Dropzone here

    Dropzone.autoDiscover = false;
    if($('.dropzone').length > 0){
      $("div#idDropzone").dropzone({
        url: "/file/post"
      });
      $("div#ingresosDropzone").dropzone({
        url: "/file/post"
      });
      $("div#testimonioDropzone").dropzone({
        url: "/file/post"
      });
      $("div#domicilioDropzone").dropzone({
        url: "/file/post"
      });
    }
