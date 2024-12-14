#include <iostream>
#include <cstdlib>
#include <ctime>
using namespace std;
int main()
{
    cout << "Welcome to the Number Guessing Game" << endl;

    cout << "Choose the level you want to play: " << endl;
    cout << "Easy (E), Medium (M), Hard (H)" << endl;

    char difficult;
    cin >> difficult;

    int numbers_of_tries;

    if (difficult == 'E')
    {
        numbers_of_tries = 15;
    }
    else if (difficult == 'M')
    {
        numbers_of_tries = 10;
    }
    else
    {
        numbers_of_tries = 5;
    }

    srand(time(NULL));
    const int SECRET_NUMBER = rand() % 100;

    bool not_guessed = true;
    int tries = 0;

    double points = 1000.0;

    for (tries = 1; tries <= numbers_of_tries; tries++)
    {
        cout << "Try " << tries << endl;
        int guess;
        cout << "Which is your guess?";
        cin >> guess;

        double lost_points = abs(guess - SECRET_NUMBER) / 2.0;
        points = points - lost_points;

        cout << "The value you chose is: " << guess << endl;

        bool guessed = guess == SECRET_NUMBER;
        bool greater = guess > SECRET_NUMBER;

        if (guessed)
        {
            cout << "Congratulations! You discovered the secret number!" << endl;
            not_guessed = false;
            break;
        }
        else if (greater)
        {
            cout << "Your guess was greater than the secret number!" << endl;
        }
        else
        {
            cout << "Your guess was lower than the secret number!" << endl;
        }
    }

    cout << "End of the game!" << endl;
    if (not_guessed)
    {
        cout << "You lose! Try Again!" << endl;
    }
    else
    {
        cout << "You discovered the secret number in " << tries << " tries" << endl;
        cout.precision(2);
        cout << fixed;
        cout << "Your total points was " << points << " points." << endl;
    }
}