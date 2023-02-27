#imports
from flask import Flask, render_template, request

#flask contructor takes name of module as argument
app = Flask(__name__, static_url_path='/static')


#app calls this function for this url
@app.route('/')
def stage_setup():
    return render_template("stage_setup.html")