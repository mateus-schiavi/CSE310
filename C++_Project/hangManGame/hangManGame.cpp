#include <iostream>
#include <fstream>
#include <string>
#include <map>
#include <vector>
#include <ctime>
#include <cstdlib>
using namespace std;

string secret_word = "WATERMELON";
map<char, bool> option;
vector<char> wrong_guess;

bool existing_letter(char guess)
{
    for (char letter : secret_word)
    {
        if (guess == letter)
        {
            return true;
        }
    }
    return false;
}

bool not_guessed()
{
    for (char letter : secret_word)
    {
        if (!option[letter])
        {
            return true;
        }
    }
    return false;
}

bool not_hung()
{
    return wrong_guess.size() < 5;
}

int letters_remaining()
{
    int remaining = 0;
    for (char letter : secret_word)
    {
        if (!option[letter])
        {
            remaining++;
        }
    }
    return remaining;
}

void print_header()
{
    cout << "*******************************" << endl;
    cout << "* Welcome to the Hangman Game *" << endl;
    cout << "*******************************" << endl;
    cout << endl;
}

void print_errors()
{
    cout << "Wrong Guesses: ";
    for (char letter : wrong_guess)
    {
        cout << letter << " ";
    }
    cout << endl;
}

void print_word()
{
    for (char letter : secret_word)
    {
        if (option[letter])
        {
            cout << letter << " ";
        }
        else
        {
            cout << "_ ";
        }
    }
    cout << endl;
}

void decision()
{
    cout << "Your letter: ";

    char guess;
    cin >> guess;

    option[guess] = true;

    if (existing_letter(guess))
    {
        cout << "Your chosen letter is on the word" << endl;
    }
    else
    {
        cout << "Your chosen letter is not on the word" << endl;
        wrong_guess.push_back(guess);
    }
    cout << endl;
}

bool guess_word()
{
    cout << "Do you want to try guessing the word? (Y/N): ";
    char response;
    cin >> response;

    if (response == 'Y' || response == 'y')
    {
        cout << "Enter your guess: ";
        string guess;
        cin >> guess;

        if (guess == secret_word)
        {
            cout << "Congratulations! You guessed the secret word!" << endl;
            return true;
        }
        else
        {
            cout << "Wrong guess! Keep trying." << endl;
        }
    }
    return false;
}

vector<string> read_file()
{
    ifstream file;
    file.open("words.txt");

    if (file.is_open())
    {
        int words_stored;
        file >> words_stored;

        vector<string> words_in_the_file;

        for (int i = 0; i < words_stored; i++)
        {
            string read_word;
            file >> read_word;
            words_in_the_file.push_back(read_word);
        }
        file.close();
        return words_in_the_file;
    }
    else
    {
        cout << "The words file could not be found!" << endl;
        exit(0);
    }
}

void draw_words()
{
    vector<string> words = read_file();

    srand(time(NULL));
    int draw_index = rand() % words.size();

    secret_word = words[draw_index];
}

void save_file(vector<string> new_list)
{
    ofstream file;
    file.open("words.txt");

    if (file.is_open())
    {
        file << new_list.size() << endl;

        for (string word : new_list)
        {
            file << word << endl;
        }
        file.close();
    }
    else
    {
        cout << "The words file could not be found!" << endl;
        exit(0);
    }
}

void add_word()
{
    cout << "Type the new word, using capital letters." << endl;
    string new_word;
    cin >> new_word;

    vector<string> word_list = read_file();
    word_list.push_back(new_word);

    save_file(word_list);
}

int main()
{
    print_header();

    read_file();
    draw_words();

    while (not_guessed() && not_hung())
    {
        print_errors();

        print_word();

        // Verificar se restam apenas 3 letras a serem descobertas
        if (letters_remaining() == 3)
        {
            if (guess_word())
            {
                return 0; // O jogador acertou a palavra, encerra o jogo
            }
        }

        decision();
    }

    cout << "End of Game!" << endl;
    cout << "The secret word was: " << secret_word << endl;
    if (not_guessed())
    {
        cout << "You lose! Try Again!" << endl;
    }
    else
    {
        cout << "You won! You discovered the secret word!" << endl;

        cout << "Would you like to add a new word to the game? (Y/N): ";
        char answer;
        cin >> answer;

        if (answer == 'Y')
        {
            add_word();
        }
    }

    return 0;
}
