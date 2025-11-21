import turtle

t = turtle.Turtle()

# Réglages du crayon
t.pensize(3)
t.pencolor("red")
t.speed(0)

# Aller à une position sans dessiner
t.penup()
t.goto(-50, 0)
t.pendown()

# Dessiner un cercle rouge rempli en bleu
t.fillcolor("blue")
t.begin_fill()
t.circle(50)
t.end_fill()

turtle.done()