from fabric.api import run, env, sudo, cd, prefix, shell_env

env.hosts = ['45.32.193.114']
env.user = 'ggrilli'

DIR = '/Users/ggrilli/github/draw_together'
VENV = 'echo Hello'

def start ():
  with cd(DIR):
    with shell_env(PATH='/home/ggrilli/.nvm/versions/node/v6.10.3/bin:$PATH'):
      with prefix(VENV):
        run('pm2 start backend.js > start.log')
        
def stop ():
  run('pm2 stop all > stop.log')
  
def deploy ():
  with cd(DIR):
    run('git pull')
    
    with prefix(VENV):
      run('npm install  > install.log')
      
    run('pm2 restart all > restart.log')
    
def hello ():
  print("Hello")