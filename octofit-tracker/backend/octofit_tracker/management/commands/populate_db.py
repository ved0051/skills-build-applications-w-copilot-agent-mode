from django.core.management.base import BaseCommand
from django.db import models
from django.utils import timezone
from octofit_tracker.models import User, Team, Workout, Activity, Leaderboard
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        client = MongoClient('mongodb://localhost:27017/')
        db = client['octofit_db']

        # Drop stale Django collections to avoid mixed PK state
        for collection_name in [
            'octofit_tracker_activity',
            'octofit_tracker_leaderboard',
            'octofit_tracker_user',
            'octofit_tracker_workout',
            'octofit_tracker_team',
        ]:
            if collection_name in db.list_collection_names():
                db.drop_collection(collection_name)

        # Create Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create Users
        users = [
            User.objects.create(name='Spider-Man', email='spiderman@marvel.com', team=marvel),
            User.objects.create(name='Iron Man', email='ironman@marvel.com', team=marvel),
            User.objects.create(name='Wonder Woman', email='wonderwoman@dc.com', team=dc),
            User.objects.create(name='Batman', email='batman@dc.com', team=dc),
        ]

        # Create Workouts
        run = Workout.objects.create(name='Run', description='Running workout')
        swim = Workout.objects.create(name='Swim', description='Swimming workout')
        lift = Workout.objects.create(name='Lift', description='Weight lifting')

        # Create Activities
        Activity.objects.create(user=users[0], workout=run, date=timezone.now().date(), duration=30, points=10)
        Activity.objects.create(user=users[1], workout=swim, date=timezone.now().date(), duration=45, points=15)
        Activity.objects.create(user=users[2], workout=lift, date=timezone.now().date(), duration=60, points=20)
        Activity.objects.create(user=users[3], workout=run, date=timezone.now().date(), duration=25, points=8)

        # Calculate Leaderboard
        for team in Team.objects.all():
            total_points = Activity.objects.filter(user__team=team).aggregate(models.Sum('points'))['points__sum'] or 0
            Leaderboard.objects.create(team=team, total_points=total_points)

        # Ensure unique email index on the user collection
        db.octofit_tracker_user.create_index([('email', 1)], unique=True)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data!'))
