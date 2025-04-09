document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email').value.trim();
    const username = document.getElementById('username').value.trim();
    const catchphrase = document.getElementById('catchphrase').value.trim();
  
    if (!email || !username || !catchphrase) {
      alert("Please fill all fields.");
      return;
    }
  
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, catchphrase })
      });
  
      const data = await res.json();
      console.log("📦 Register response:", data);
  
      if (res.ok) {
        alert("✅ Registered successfully!");
        window.location.href = 'index.html';
      } else {
        alert(`❌ ${data.error}`);
      }
    } catch (err) {
      console.error("Register error:", err);
      alert("Something went wrong!");
    }
  });
  