#imports
from flask import Flask, render_template, request

#flask contructor takes name of module as argument
app = Flask(__name__, static_url_path='/static')


#app calls this function for this url
@app.route('/')
def DandD_page():
    return render_template("D&D_page.html")


#     G A Y   B A B Y   J A I L
#====================================
#||                                ||
#||       # fox did this boi       ||
#||                                ||
#||                                ||
#====================================

app.run(port=5001)