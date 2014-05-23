from fabric.api import *
from fabric.colors import green, yellow, red
from fabric.contrib.project import rsync_project
from fabric.contrib.console import confirm
from contextlib import contextmanager as _contextmanager



rsync_excludes = ("*_local.py", "*.pyc", ".git/*", "*node_modules*", "temp", "config.php", "resources")


def production():
	env.settings = 'production'
	env.user = 'razorflow'
	env.hosts = ['107.170.146.248']

@_contextmanager
def virtualenv():
    with cd(env.app_directory):
        with prefix(env.activate):
            yield
 
def deploy():
	upload_app ()
	print(green("##################################################################"))
	print(green("## Finished deploy without any known errors. Please still test. ##"))
	print(green("##################################################################"))


def upload_app ():
	print (yellow("Uploading application to web server..."))
	rsync_project(
		remote_dir="/home/razorflow/webrf/",
		local_dir=".",
		exclude=rsync_excludes,
	)
