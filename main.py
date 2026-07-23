import tkinter


window=tkinter.Tk()
window.title("login form")
window.geometry('340x440')
window.configure(bg="#333333")
label=tkinter.Label(window,text="Login Form",font=("Arial",20),bg="#333333",fg="white")
label.pack(pady=20)

window.mainloop()
