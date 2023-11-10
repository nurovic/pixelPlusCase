document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("nameInput");
    const jobInput = document.getElementById("jobInput");
    const createUser = document.getElementById("createUser");
    const backToHome = document.getElementById("backToHome");
    const userDetailsContainer = document.getElementById("userDetailsContainer");


    function showNotification(message, isSuccess) {
        const notificationContainer = document.getElementById('notificationContainer');
    
        const notification = document.createElement('div');
        notification.className = isSuccess ? 'success' : 'error';
        notification.textContent = message;
    
        notificationContainer.appendChild(notification);
    
        setTimeout(() => {
            notification.remove();
        }, 3000); 
    }
    


    createUser.addEventListener("click", async function () {
        const name = nameInput.value;
        const job = jobInput.value;

        if (name && job) {
            try {
                const response = await fetch('https://reqres.in/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name,
                        job: job,
                    }),
                });
                
                showNotification('User created successfully!', true);
                const data = await response.json();
                console.log(response)

            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            userDetailsContainer.innerHTML = '<p>Please enter both Name and Job.</p>';
        }
    });

    backToHome.addEventListener("click", function () {
        window.location.href = "/index.html";
    });

});
