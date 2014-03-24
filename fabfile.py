from fabric.api import *
from fabric.colors import green, yellow, red
from fabric.contrib.project import rsync_project
from fabric.contrib.console import confirm
from contextlib import contextmanager as _contextmanager



 # Default release is 'current'
env.release = 'current'

rsync_excludes = ("*_local.py", "*.pyc", ".git/*", "*node_modules*", "composer.phar", "adminer.php")


def production():
	env.settings = 'production'
	env.user = 'razorflow'
	env.hosts = ['examples.razorflow.com']
 
def deploy():
	upload_app ()
	print(green("##################################################################"))
	print(green("## Finished deploy without any known errors. Please still test. ##"))
	print(green("##################################################################"))

def upload_app ():
	rsync_project(
		remote_dir= "/home/razorflow/examples/",
		local_dir=".",
		exclude=rsync_excludes,
	)
