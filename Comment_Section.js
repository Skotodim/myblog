

// TODO : note which characters cant be used in article titles (sanitizefirebasekey)




/**
 * Initialize firebase
 */

var config = {
    apiKey: "AIzaSyAgwo_74CAcq1h3YRNXR8REPomN7_IK-io",
    authDomain: "pipi-44496.firebaseapp.com",
    databaseURL: "https://pipi-44496.firebaseio.com",
    projectId: "pipi-44496"

};
firebase.initializeApp(config);

/**
 * Submit new comment program
 */

var submitButton = document.getElementById('submit-button');
var bodyText = document.getElementById('body');

submitButton.addEventListener('click', function() {

    var body = bodyText.value;

    firebase.database().ref('blog/article_link/').orderByValue().equalTo(document.URL).once('value', function(data) {
        data.forEach(function(data) {
		        var article_id = data.key;
		        var commentRef = 'blog/article_comments/' + article_id + '/';
		        var commentData = {
		    	      body: body,
		    	      date_published: firebase.database.ServerValue.TIMESTAMP,
		    	      user_id: 'user1'
		        };
		        var key = firebase.database().ref(commentRef).push().key;

        		var updates = {};
    		    updates[commentRef + key] = commentData;


    		    return firebase.database().ref().update(updates)
        		.then(function() {
          			alert('New comment added');			
        		})
          	.catch(function(error) { 
    			      console.log(error);
    			  alert(error.message)
    		    })
        })
    })
})   
/*
function sanitizeFirebaseKey(key) {
	return key.replace(/[\.\/\$\[\]\x7F\x00-\x1F]/g, "-");
}
*/


