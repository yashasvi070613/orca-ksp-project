import os
import re
import sys

desktop_dir = r"C:\Users\yasha\OneDrive\Desktop"
datathon_dir = r"C:\Users\yasha\OneDrive\Desktop\coding\datathon"

html_file = os.path.join(desktop_dir, "index.html")
css_file = os.path.join(desktop_dir, "style.css")
js_file = os.path.join(desktop_dir, "app.js")

if not os.path.exists(html_file):
    print("Cannot find index.html on desktop")
    sys.exit(1)

with open(html_file, 'r', encoding='utf-8') as f:
    html_content = f.read()

with open(css_file, 'r', encoding='utf-8') as f:
    css_content = f.read()

with open(js_file, 'r', encoding='utf-8') as f:
    js_content = f.read()

def replace_text(text):
    text = text.replace("KSP CrimeAI", "O.R.C.A")
    text = text.replace("Karnataka State Police", "Organised Crime Analysis Authority")
    text = text.replace("KSP", "O.R.C.A")
    return text

html_content = replace_text(html_content)
css_content = replace_text(css_content)
js_content = replace_text(js_content)

# Extract auth modal for login
auth_match = re.search(r'(<!-- ===== AUTH MODAL OVERLAY ===== -->.*?)\s*<!-- ===== NAVBAR ===== -->', html_content, re.DOTALL)
auth_content = auth_match.group(1) if auth_match else ""

# Extract navbar, main, footer for landing
landing_body_match = re.search(r'(<!-- ===== NAVBAR ===== -->.*)', html_content, re.DOTALL)
landing_body = landing_body_match.group(1) if landing_body_match else html_content

head_match = re.search(r'(<!DOCTYPE html>.*?<body>)', html_content, re.DOTALL)
head_content = head_match.group(1) if head_match else ""

# Update CSS links in head
head_landing = head_content.replace('href="style.css"', 'href="landing.css"')
head_login = head_content.replace('href="style.css"', 'href="login.css"')

# LANDING HTML
landing_html = head_landing + "\n" + landing_body
# Fix buttons opening auth to link to login.html
landing_html = landing_html.replace('onclick="openAuth()"', 'onclick="window.location.href=\'login.html\'"')
landing_html = landing_html.replace('<script src="app.js"></script>', '<script src="landing.js"></script>')

# LOGIN HTML
login_html = head_login + "\n" + auth_content + "\n<script src=\"login.js\"></script>\n</body>\n</html>"
# Make auth modal not an overlay but the main page
login_html = login_html.replace('<div id="auth-overlay" class="auth-overlay active"', '<div id="auth-overlay" class="auth-overlay active" style="position:relative; height:100vh; background:var(--bg-base)"')

# WRITE FILES
with open(os.path.join(datathon_dir, "landing.html"), 'w', encoding='utf-8') as f:
    f.write(landing_html)
with open(os.path.join(datathon_dir, "login.html"), 'w', encoding='utf-8') as f:
    f.write(login_html)
with open(os.path.join(datathon_dir, "landing.css"), 'w', encoding='utf-8') as f:
    f.write(css_content)
with open(os.path.join(datathon_dir, "login.css"), 'w', encoding='utf-8') as f:
    f.write(css_content)
with open(os.path.join(datathon_dir, "landing.js"), 'w', encoding='utf-8') as f:
    f.write(js_content)
with open(os.path.join(datathon_dir, "login.js"), 'w', encoding='utf-8') as f:
    f.write(js_content)

print("Successfully split files using Desktop source files.")
