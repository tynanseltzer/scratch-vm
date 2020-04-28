class Node {
    constructor (opcode, args) {
        this.opcode = opcode;
        this.args = args;
        this.left = null;
        this.right = null;
        this.middle = null;
    }


}


class Tynan {
    /**
     * Walk the blocks of a sprite
     */
    static walk (blocks) {
        var retArray = []
        for (var top_block of blocks.getScripts()) {
            var actual_block = blocks.getBlock(top_block)
            retArray.push(this.walkHelper(blocks, actual_block));
        }
        return retArray;
    }

    /**
     * Walker helper, takes a single block, will only walk the connected
     */
    static walkHelper (blocks, oneBlock) {
        if (typeof oneBlock === 'undefined') {
            return null;
        }
        var opcode = blocks.getOpcode(oneBlock);
        var args = [];
        var b_node = new Node(opcode, args);
        if (opcode.localeCompare('motion_movesteps') === 0) {
            b_node.args.push(this.getNumberItem(blocks, oneBlock, "STEPS"))
            b_node.right = this.walkHelper(blocks, blocks.getBlock(blocks.getNextBlock(oneBlock.id)))
            return b_node;
        }
        else if (opcode.localeCompare('motion_turnright') === 0 || opcode.localeCompare('motion_turnleft') === 0) {
            b_node.args.push(this.getNumberItem(blocks, oneBlock, "DEGREES"));
            b_node.right = this.walkHelper(blocks, blocks.getBlock(blocks.getNextBlock(oneBlock.id)))
            return b_node;
        }

        else if (opcode.localeCompare('pen_penDown') === 0 || opcode.localeCompare('pen_penUp') === 0 || opcode.localeCompare('pen_clear') === 0) {
            b_node.right = this.walkHelper(blocks, blocks.getBlock(blocks.getNextBlock(oneBlock.id)));
            return b_node;
        }
        else if (opcode.localeCompare('control_repeat') == 0) {
            b_node.args.push(this.getNumberItem(blocks, oneBlock, "TIMES"));
            b_node.right = this.walkHelper(blocks, blocks.getBlock(blocks.getNextBlock(oneBlock.id)));
            b_node.middle = this.walkHelper(blocks, blocks.getBlock(blocks.getBranch(oneBlock.id, 1)));
            return b_node;
        }

    }

    static getNumberItem (blocks, oneBlock, type) {
        var blockId;
        if (type.localeCompare("STEPS") === 0) {
            blockId = oneBlock.inputs.STEPS.block;
        }
        else if (type.localeCompare("DEGREES") === 0) {
            blockId = oneBlock.inputs.DEGREES.block;
        }
        else if (type.localeCompare("TIMES") === 0) {
            blockId = oneBlock.inputs.TIMES.block;
        }
        var stepBlock = blocks.getBlock(blockId);
        return stepBlock.fields.NUM.value;
    }

}
module.exports = Tynan;
