

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
 * Show all comments
 */

firebase.database().ref('blog/article_link/').orderByValue().equalTo(document.URL).once('value', function(data) {
    data.forEach(function(data) {
        var article_id = data.key;
	      var commentRef = 'blog/article_comments/' + article_id + '/';
      
        firebase.database().ref(commentRef).orderByChild('date_published').once('value', function(data) {
            var ul = document.getElementById('comments');
            data.forEach(function(data) {
                var date = new Date(data.val().date_published);
                var body = data.val().body;
                var author = data.val().u_id;

                var p1 = document.createElement('p');
                p1.appendChild(document.createTextNode(body));
                var p2 = document.createElement('p');
                p2.appendChild(document.createTextNode('Written by ' + author + ' at ' + date));
                var li = document.createElement ('li');
                li.appendChild(p1);
                li.appendChild(p2);
                ul.appendChild(li);
            })
        })
    })
})

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
		    	      u_id: 'user1'
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
function timestampToDate(timestamp) {
    SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
    sfd.format(new Date(timestamp));
    return sdf;
}
*/

/*
function sanitizeFirebaseKey(key) {
	return key.replace(/[\.\/\$\[\]\x7F\x00-\x1F]/g, "-");
}
*/


