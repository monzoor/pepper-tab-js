/**
 * @author Monzoor
 */
 "use strict";

// Demo data url. It can be any api url.
var url = '/build/demoData/demoData.json';

(function($) {
  // Click on the tab header
  $('.tab--toggle').on('change', function () {
    // Check clicked or not
    if(!$(this).hasClass('clicked')){
      var clicked = $(this).addClass('clicked'),
          currentId = $(this).data('id'); // Current tab ID
      if(typeof currentId !== 'undefined') {
        $('#tabIndex'+ currentId +' .tab__content').html('<p>Data Loading....</p>');
        var content = dataCall(currentId); // Ajax call
      }
    }
  })

  var tabContentBuild = function (headline, content) {
    // Add p tag if the content has multiple line
    content = content.split('\n'),
    para = '<p class="text--semi-dark-gray">' + content.join('</p><p class="text--semi-dark-gray">') + '</p>',
    tabContent = '<h3 class="text--dark">{{contentHeadline}}</h3>{{para}}';

    return tabContent = tabContent.replace("{{contentHeadline}}",headline).replace("{{para}}",para);
  }

  var dataCall =  function (id) {
    var request = $.ajax({
      url: url,
      method: "GET",
      dataType: "json"
    });

    request.done(function (data) {
      // Get currenet Id's data
      var curentContentData = data.filter(function (content){
        return content.id === id;
      });
      // Create html from the data
      var renderedContent = tabContentBuild(curentContentData[0].headline, curentContentData[0].content);

      // Append html data on the tab content
      $('#tabIndex'+id+' .tab__content').html(renderedContent);
    });

    // If error
    request.fail(function( jqXHR, textStatus ) {
      $('#tabIndex'+id+' .tab__content').html('Data '+jqXHR.statusText);
    });
  }
})(window.jQuery);
