 // Login
  $(document).ready(function () {
    $("#login-form").submit(function (event) {
        event.preventDefault(); 
        var username = $("#your_name").val();
        var password = $("#your_pass").val();
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:8080/api/auth/signin",
            data: JSON.stringify({
                "username": username,
                "password": password
            }),
            success: function (data) {
               
                console.log("Đăng nhập thành công", data);
            },
            error: function (error) {
                
                console.error("Đăng nhập thất bại", error);
            }
        });
    });
});
 
 // Signup

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;
    var confirmPassword = document.getElementById("re_pass").value;

    if (password !== confirmPassword) {
        alert("Password and Confirm Password do not match");
        return;
    }

    var registrationData = {
        name: name,
        email: email,
        password: password
    };
 
    fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registrationData)
    })
    .then(response => response.json())
    .then(data => {
       
        console.log(data);
        if (data.success === true) {
           
            window.location.href = './product.html';
        } else {
            
            console.error('Signup failed:', data.error);
        }
       
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Production

fetch("http://localhost:8080/api/categories")
.then((response) => response.json())
.then((data) => {
  const categoryFilter = document.getElementById("categoryFilter");


  categoryFilter.innerHTML = "";

  
  const allCategoriesOption = document.createElement("option");
  allCategoriesOption.value = "";
  allCategoriesOption.textContent = "All Categories";
  categoryFilter.appendChild(allCategoriesOption);

  
  data.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categoryFilter.appendChild(option);
  });
})
.catch((error) => console.error("Error fetching categories:", error));

function filterProducts(categoryId) {
      
       fetch("http://localhost:8080/api/products?categoryId=" + categoryId)
       .then((response) => response.json())
       .then((data) => updateProductList(data))
       .catch((error) => console.error("Error fetching products:", error));
       
      function updateProductList(products) {
      const productList = document.getElementById("productList");
      productList.innerHTML = ""; 

      products.forEach((product) => {
        const listItem = document.createElement("li");
        listItem.textContent = product.name;
        productList.appendChild(listItem);
      });
    }


  }
    




