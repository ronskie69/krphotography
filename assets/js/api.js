document.getElementById("inquiry-form").addEventListener('submit', function(e){
    e.preventDefault()

    let email = document.getElementById("email").value
    let service = document.getElementById("service").value
    let message = document.getElementById("message").value
    let submit = document.getElementById("submit")

    submit.setAttribute("readonly", true)
    submit.innerHTML = `<i class="fa-solid fa-spinner fa-spin me-2"></i>Sending...`

    let link = "https://roberts.com.ph:8090";

    fetch(`${link}/forms/amendment/api/post_request.php`, {
        method: 'POST',
        body: JSON.stringify({ email, message, service }),
        headers: {
            "Content-Type": 'text/plain; charset=utf8;',
            Accept: 'text/plain;'
        }
    })
    .then(res => res.json())
    .then(data => {

        if(data.response = 'success') {

            document.getElementById("email").value = ""
            document.getElementById("service").value = ""
            document.getElementById("message").value = ""

            submit.setAttribute("readonly", false)
            submit.removeAttribute("readonly")
            submit.innerHTML = `Send Inquiry`

            notice('Mail sent! Thank you so much!', 'Please wait for their response in email.', 'success')
        } else {
            notice('Failed!', 'Failed to send inquiry. Please try again later', 'error')
        }        
    })
    .catch(() => {
        notice('Failed to send inquiry!', 'Please try again later.', 'error')
    })
})

function notice(title = 'Unknown', text = 'Unknown Occured', status = 'warning'){
    return new Notify ({
        title: title,
        text: text,
        status: status,
        speed: 300,
        effect: 'slide',
        autoclose: true,
        autotimeout: 5000
    })
}

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}