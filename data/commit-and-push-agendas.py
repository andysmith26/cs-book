import subprocess
subprocess.check_output('git add planning-csa.json', shell=True)
subprocess.check_output('git commit -m "autoupdate agenda file"', shell=True)
subprocess.check_output('git push', shell=True)
