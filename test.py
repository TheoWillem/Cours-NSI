import turtle
t = turtle.Turtle() 

t.forward(100)
t.right(90)
t.left(90)
t.goto(100, 100)

t.penup()
t.pendown()
t.pensize(3)
t.pencolor("red")
t.speed(0)

t.circle(50)

t.fillcolor("blue")
t.begin_fill()
t.end_fill()

turtle.done()
