document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const catchphrase = document.getElementById('catchphrase').value;
    const ec = new elliptic.ec('secp256k1');
    const sha256 = new TextEncoder().encode(catchphrase);
    const digest = await crypto.subtle.digest('SHA-256', sha256);
    const privateKey = Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
    const key = ec.keyFromPrivate(privateKey);
    const publicKey = key.getPublic('hex');
  
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ catchphrase })
    });
  
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('username', data.username);
      window.location.href = 'home.html';
    } else {
      alert(data.error || 'Login failed');
    }
  });
  