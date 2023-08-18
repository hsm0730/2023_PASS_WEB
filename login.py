def login(id, password):
    user = db.getUser(id)
    if user.password == hash(password):
        return user
    else:
        return null