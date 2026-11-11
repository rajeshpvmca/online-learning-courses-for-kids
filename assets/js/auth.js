// ===================================================================
// STACKLY KIDS ACADEMY - AUTHENTICATION LOGIC (auth.js)
// Theme: Online Learning Courses For Kids
// Supported Roles: Student, Parent, Teacher
// ===================================================================

const KIDS_LEARNING_ROLES = ["Student", "Parent", "Teacher"];

// REGISTER
const signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const selectedRoleInput = document.querySelector('input[name="role"]:checked');
    let role = selectedRoleInput ? selectedRoleInput.value : 'Student';
    if (!KIDS_LEARNING_ROLES.includes(role)) {
      role = 'Student';
    }

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPass = document.getElementById("confirmPassword").value;

    // Password rules
    if (password.length < 8) {
      showError("password", "Password must be at least 8 characters."); return;
    }
    if (!/[A-Z]/.test(password)) {
      showError("password", "Password must contain at least one uppercase letter."); return;
    }
    if (!/[0-9]/.test(password)) {
      showError("password", "Password must contain at least one number."); return;
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      showError("password", "Password must contain at least one symbol (!@#$%^&*)."); return;
    }
    if (password !== confirmPass) {
      showError("confirmPassword", "Passwords do not match."); return;
    }

    localStorage.setItem(
      "user_" + email,
      JSON.stringify({ name, role, email, password })
    );
    window.location.href = "login.html";
  });
}

function showError(fieldId, msg) {
  const input = document.getElementById(fieldId);
  if (!input) return;
  input.classList.add("is-invalid");
  let fb = input.parentElement.nextElementSibling;
  if (!fb || !fb.classList || !fb.classList.contains("invalid-feedback")) {
    fb = document.createElement("div");
    fb.className = "invalid-feedback d-block mt-1";
    input.parentElement.insertAdjacentElement("afterend", fb);
  }
  fb.textContent = msg;
  input.addEventListener("input", () => {
    input.classList.remove("is-invalid");
    if (fb) fb.textContent = "";
  }, { once: true });
}

// LOGIN
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const selectedRoleInput = document.querySelector('input[name="loginRole"]:checked');
    let role = selectedRoleInput ? selectedRoleInput.value : 'Student';
    if (!KIDS_LEARNING_ROLES.includes(role)) {
      role = 'Student';
    }

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    // Password rules for Login (to ensure strength bar is respected before login)
    if (password.length < 8) {
      showError("loginPassword", "Password must be at least 8 characters."); return;
    }
    if (!/[A-Z]/.test(password)) {
      showError("loginPassword", "Password must contain at least one uppercase letter."); return;
    }
    if (!/[0-9]/.test(password)) {
      showError("loginPassword", "Password must contain at least one number."); return;
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      showError("loginPassword", "Password must contain at least one symbol (!@#$%^&*)."); return;
    }

    // Demo Login: Create session with selected role
    const user = { name: email.split("@")[0], role: role, email: email };
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    window.location.href = "dashboard.html";
  });
}

// Universal Password Visibility Toggle
document.querySelectorAll('.toggle-password').forEach(toggle => {
    toggle.addEventListener('click', function () {
        const input = this.parentElement.querySelector('input');
        if (input) {
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
        
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            }
        }
    });
});

// Global Handler for Empty Links (404 Redirection)
document.addEventListener("click", function(e) {
    const target = e.target.closest("a");
    if (target) {
        const href = target.getAttribute("href");
        if (!href || href === "#" || href === "" || href.startsWith("#!")) {
            e.preventDefault();
            const currentPath = window.location.pathname;
            const inSubfolder = currentPath.includes('/dashboard/');
            window.location.href = inSubfolder ? '../404.html' : '404.html';
        }
    }
});