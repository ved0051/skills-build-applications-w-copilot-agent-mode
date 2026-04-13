


from djongo import models
from bson import ObjectId
def generate_objectid():
    return str(ObjectId())


class Team(models.Model):
    id = models.CharField(primary_key=True, default=generate_objectid, editable=False, max_length=24)
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class User(models.Model):
    id = models.CharField(primary_key=True, default=generate_objectid, editable=False, max_length=24)
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='members')

    def __str__(self):
        return self.name

class Workout(models.Model):
    id = models.CharField(primary_key=True, default=generate_objectid, editable=False, max_length=24)
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name

class Activity(models.Model):
    id = models.CharField(primary_key=True, default=generate_objectid, editable=False, max_length=24)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    workout = models.ForeignKey(Workout, on_delete=models.CASCADE)
    date = models.DateField()
    duration = models.PositiveIntegerField(help_text='Duration in minutes')
    points = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.user.name} - {self.workout.name} on {self.date}"

class Leaderboard(models.Model):
    id = models.CharField(primary_key=True, default=generate_objectid, editable=False, max_length=24)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    total_points = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.team.name} - {self.total_points} points"
