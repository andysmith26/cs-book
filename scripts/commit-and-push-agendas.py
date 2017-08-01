import subprocess
subprocess.check_output('git add _A-csp-demo.json', shell=True)
subprocess.check_output('git commit -m "autoupdate agenda file"', shell=True)
subprocess.check_output('git push', shell=True)
