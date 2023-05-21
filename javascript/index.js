$(document).ready(function () {
  // Retrieve the active link from session storage, if available
  var activeLink = sessionStorage.getItem('activeLink');

  // Add active class to the stored active link, if available
  if (activeLink) {
    $('a.nav-link[href="' + activeLink + '"]').addClass('active');
  }
  // Attach click event handler to navigation links
  $('a.nav-link').click(function (e) {
    e.preventDefault(); // Prevent default link behavior

    var url = $(this).attr('href'); // Get the URL of the linked page
    // Remove active class from all navigation links
    $('a.nav-link').removeClass('active');

    // Add active class to the clicked navigation link
    $(this).addClass('active');

    // Use the History API to update the URL
    history.pushState(null, null, url);


    // Store the active link in session storage
    sessionStorage.setItem('activeLink', url);
    // Make an AJAX request to load the content of the linked page
    $.ajax({
      url: url,
      method: 'GET',
      dataType: 'html',
      success: function (response) {
        // Replace the content of the current page with the loaded content
        $('body').html(response);
      },
      error: function (xhr, status, error) {
        console.log(error);
      }
    });
  })
});

