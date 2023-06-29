import random

def sum(a, b, c):
    return a + b + c

def no_win(X, O):
    for cell in X + O:
        if cell != 'X' and cell != 'O':
            return -1
    return -2

def board(X, O):
    cells = []
    for x, o in zip(X, O):
        if x == 1:
            cells.append('X')
        elif o == 1:
            cells.append('O')
        else:
            cells.append(' ')
    
    print(f"| {cells[0]} | {cells[1]} | {cells[2]} | ")
    print("--------------")
    print(f"| {cells[3]} | {cells[4]} | {cells[5]} | ")
    print("--------------")
    print(f"| {cells[6]} | {cells[7]} | {cells[8]} |")

def win(X, O):
    winner = [[0, 1, 2], [0, 3, 6], [3, 4, 5], [6, 7, 8], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    
    for i in winner:
        if sum(X[i[0]], X[i[1]], X[i[2]]) == 3:
            print("X won")
            return 1
        if sum(O[i[0]], O[i[1]], O[i[2]]) == 3:
            print("O won")
            return 0
    return -1

def get_empty_cells(X, O):
    empty_cells = []
    for i in range(9):
        if X[i] == 0 and O[i] == 0:
            empty_cells.append(i)
    return empty_cells

def enemy_move(X, O):
    empty_cells = get_empty_cells(X, O)
    
    # Check if the enemy can win in the next move
    for cell in empty_cells:
        temp_O = O[:]
        temp_O[cell] = 1
        if win(X, temp_O) == 0:
            return cell
    
    # Check if the enemy needs to block the player from winning
    for cell in empty_cells:
        temp_X = X[:]
        temp_X[cell] = 1
        if win(temp_X, O) == 1:
            return cell
    
    # Otherwise, choose a random empty cell
    return random.choice(empty_cells)

if __name__ == "__main__":
    X = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    O = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    
    print("Welcome to tic tac toe")
    turn = 1
    moves = 0
    
    while True:
        board(X, O)
        
        if turn == 1:
            print('Player X chance')
            while True:
                x = int(input("Enter a number (0-8): "))
                if X[x] == 0 and O[x] == 0:
                    X[x] = 1
                    break
                else:
                    print("Invalid move! Please select an empty cell.")
        else:
            print('Enemy O chance')
            o = enemy_move(X, O)
            O[o] = 1
            print(f"Enemy O chose cell {o}")
        
        moves += 1
        if moves >= 9:
            cnowin = no_win(X, O)
            if cnowin == -2:
                print("Draw! The game is over.")
                break
        
        cwin = win(X, O)
        
        if cwin != -1:
            print("Match over")
            break
        
        turn = 1 - turn
