import { blockClasses } from "../models/constants.js";

class GameModule {
    constructor(boardContainer, inventoryContainer) {
        this.boardContainer = boardContainer;
        this.inventoryContainer = inventoryContainer;
        this.selectedTool = null;
        this.inventory = {};
        this.toolToBlockMap = {
            pickaxe: ['rock'],
            axe: ['wood', 'leaves'],
            shovel: ['dirt', 'grass']
        };
        this.selectedBlock = null; 
    }
    initGame() {
      this.boardContainer.innerHTML = "";
      this.createInitialBoard();
      this.setupTools();
      
      
      console.log("Inventory Container:", this.inventoryContainer);
      if (this.inventoryContainer) {
          this.initializeInventory(); 
          this.updateInventoryDisplay(); 
      } else {
          console.error("Inventory container not found.");
      }
      
  }
  

    createInitialBoard() {
        const rows = 10;
        const cols = 10;

        const layout = [
            ['sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky'],
            ['sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky', 'sky'],
            ['sky', 'sky', 'sky', 'leaves', 'leaves', 'leaves', 'sky', 'sky', 'sky', 'sky'],
            ['sky', 'sky', 'leaves', 'leaves', 'leaves', 'leaves', 'leaves', 'sky', 'sky', 'sky'],
            ['sky', 'sky', 'leaves', 'leaves', 'leaves', 'leaves', 'leaves', 'sky', 'sky', 'sky'],
            ['sky', 'sky', 'sky', 'sky', 'wood', 'sky', 'sky', 'sky', 'sky', 'sky'],
            ['sky', 'sky', 'sky', 'sky', 'wood', 'sky', 'sky', 'sky', 'sky', 'sky'],
            ['grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass', 'grass'],
            ['dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt'],
            ['dirt', 'rock', 'dirt', 'rock', 'dirt', 'rock', 'dirt', 'rock', 'dirt', 'rock']
        ];

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.classList.add(blockClasses[layout[i][j]]);
                cell.dataset.blockType = layout[i][j];
                this.boardContainer.appendChild(cell);
                this.handleCell(cell);
            }
        }
    }

    handleCell(cell) {
        cell.addEventListener("click", (e) => this.cellClickHandler(e));
    }

    cellClickHandler(e) {
        const cell = e.target;
        const blockType = cell.dataset.blockType;

        console.log('Cell clicked:', blockType);

        if (this.selectedTool) {
            if (this.canRemoveBlock(blockType)) {
                console.log('Removing block:', blockType);
                cell.className = "cell sky-block";
                cell.dataset.blockType = "sky";
                this.addToInventory(blockType);
            }
        } else if (this.selectedBlock) {
            if (blockType === 'sky' && this.inventory[this.selectedBlock] > 0) {
                console.log('Placing block:', this.selectedBlock);
                this.removeFromInventory(this.selectedBlock);
                cell.className = `cell ${blockClasses[this.selectedBlock]}`;
                cell.dataset.blockType = this.selectedBlock;
            }
        }
    }

    canRemoveBlock(blockType) {
        if (this.selectedTool && this.toolToBlockMap[this.selectedTool]) {
            return this.toolToBlockMap[this.selectedTool].includes(blockType);
        }
        return false;
    }

    addToInventory(blockType) {
        if (!this.inventory[blockType]) {
            this.inventory[blockType] = 0;
        }
        this.inventory[blockType]++;
        console.log('Added to inventory:', blockType, this.inventory);
        this.updateInventoryDisplay();
    }

    removeFromInventory(blockType) {
        if (this.inventory[blockType] > 0) {
            this.inventory[blockType]--;
            console.log('Removed from inventory:', blockType, this.inventory);
            this.updateInventoryDisplay();
        }
    }

    initializeInventory() {
        const inventoryItems = this.inventoryContainer.querySelectorAll('.inventory-item');
        inventoryItems.forEach(item => {
            const blockType = item.dataset.blockType;
            this.inventory[blockType] = 0;
            console.log('Initialized inventory item:', blockType);
        });
    }

    updateInventoryDisplay() {
        const inventoryItems = this.inventoryContainer.querySelectorAll('.inventory-item');
        inventoryItems.forEach(item => {
            const blockType = item.dataset.blockType;
            const count = item.querySelector('.inventory-count');
            if (count) {
                count.textContent = this.inventory[blockType];
                console.log(`Updated inventory display for ${blockType}: ${this.inventory[blockType]}`);
            }
        });
    }

    setupTools() {
        const tools = document.querySelectorAll('.tool');
        tools.forEach(tool => {
            tool.addEventListener('click', () => this.selectTool(tool));
        });
    }

    selectTool(tool) {
        this.selectedTool = tool.dataset.toolType;
        this.selectedBlock = null; 
        console.log('Selected tool:', this.selectedTool);
    }

    selectBlock(blockType) {
        this.selectedBlock = blockType;
        this.selectedTool = null;
        console.log('Selected block:', this.selectedBlock);
    }
}

export default GameModule;
