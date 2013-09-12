$(document).ready(function(){
    $('#submit').click(function(){
        var url = $('#submit-form-url').val();
        if (url==""){
            //$(".controls").addClass("error");
        }
        else {
            //$("#tweet_div").show();
            $.ajax({
                url: "https://api.twitter.com/1/statuses/oembed.json?url="+url,
                dataType: "jsonp",
                success: function(data){
                    $('#tweet-div').html(data.html);
                }
            });

            $('#submit-form-url').val('');
            //manipulate tweet link to make it a Twitcher compatible link
            var tweet_url_arr = url.split('/');
            var twitcher_url = "http://twitcher.steer.me/status/"+tweet_url_arr[5];
            //grab data, and store into tweet data variables, from Twitcher feed
            $.getJSON(twitcher_url, function (data) {
                var t_date_raw = data.created_at;
                var t_author_fullname = data.user.name;
                var t_author_handle = data.user.screen_name;
                var t_content = data.text;
            //manipulate tweet data variables into variables for citations
                var author_name_arr = t_author_fullname.split(' ');
                var mla_name = 0
                if (author_name_arr.length > 2 || author_name_arr.length <= 1) {
                    mla_name = t_author_fullname+" ("+t_author_handle+"). ";
                    } 
                else {
                    mla_name = author_name_arr[1]+", "+author_name_arr[0]+" ("+t_author_handle+"). ";
                }
             
                var apa_name = t_author_handle+". ";
                var t_date_arr = t_date_raw.split(' ');
                var t_time_arr = t_date_arr[3].split(':');
                var mla_time = t_time_arr[0]+":"+t_time_arr[1]+" UTC. ";
                var mla_date = t_date_arr[2]+" "+t_date_arr[1]+" "+t_date_arr[5]+", "+mla_time;
                var apa_date = "("+t_date_arr[5]+", "+t_date_arr[1]+" "+t_date_arr[2]+"). ";
            //create variables of citation strings for MLA and APA
                mla_citation = mla_name+'"'+t_content+'". '+mla_date+" Tweet";
                apa_citation = apa_name+apa_date+t_content+" [Twitter post]. "+"Retrieved from "+url;
            //present the citations to the user
                $('div#mla-citation').html(mla_citation);
                $('div#apa-citation').html(apa_citation);
            //show hidden divs to user
                $('#tweet-div').fadeIn(1500);
                $('#citations').fadeIn(2000);
            });
        }
    })
})

