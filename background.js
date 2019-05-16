chrome.browserAction.onClicked.addListener(function(){
    chrome.tabs.query({
		currentWindow: true,
		active: true
	}, function(tab){
        let currentTabUrl = tab[0].url;
        
        let xhr = new XMLHttpRequest();
        xhr.open("GET", 'https://outlineapi.com/v3/parse_article?source_url=' + encodeURI(currentTabUrl), true);

        xhr.onload = function () {
            if(xhr.readyState == 4 && xhr.status == 200){
                let response = JSON.parse(xhr.responseText);

                console.log(response);

                if(response.success){
                    chrome.tabs.create({
                        "url": "https://www.outline.com/" + response.data.short_code
                    });
                } else {
                    alert('There was an error creating the outline, please try again');
                }
            } else {
                alert('There was an error creating the outline, please try again');
            }
        };

        xhr.send(null);
	});
});