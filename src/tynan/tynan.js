class Tynan {
    /**
     * Walk the blocks of a sprite
     */
    static walk (blocks) {
        for (var top_block of blocks.getScripts()) {
            if (blocks.getOpcode(blocks.getBlock(top_block)).localeCompare('looks_nextcostume') === 0) {
                continue;
            }
            this.walkHelper(blocks, blocks.getBlock(top_block))
        }
    }

    /**
     * Walker helper, takes a single block, will only walk the connected
     */
    static walkHelper (blocks, oneBlock) {
        if (typeof oneBlock !== 'undefined') {
            var opcode = blocks.getOpcode(oneBlock)
            if (opcode.localeCompare('motion_movesteps') === 0) {
                console.log(opcode + '(' + this.getNumberSteps(blocks, oneBlock) + ')');
            }
            this.walkHelper(blocks, blocks.getBlock(blocks.getNextBlock(oneBlock.id)));
        }

    }
    static getNumberSteps (blocks, oneBlock) {
        var blockId = oneBlock.inputs.STEPS.block
        var stepBlock = blocks.getBlock(blockId);
        return stepBlock.fields.NUM.value;
    }

}
module.exports = Tynan;
