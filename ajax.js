$(document).ready(function(){
	
  var dataURL = 'https://api.instagram.com/v1/users/self/media/recent';
  var photoData;

  var getData = function(url) {
    $.ajax({
      url: url,
      dataType: 'jsonp',
      data: {
        access_token: '2311280572.0559423.043a5a1ce3634d86a09a0b020761e77b',
        count: 12
      }
    })
    .success(function(data) {
      photoData = data;	  
	  console.dir(photoData);      
    })
    .error(function() {
		alert("데이터불러오기에 실패했습니다");
    })
  }

  

	
});










