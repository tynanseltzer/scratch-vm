class Tynan {
    /**
     * Walk the blocks of a sprite
     */
    static walk (blocks) {
        for (var top_block of blocks.getScripts()) {
            if (blocks.getOpcode(blocks.getBlock(top_block)).localeCompare("looks_nextcostume") == 0) {
                continue;
            }

        }
    }

    /**
     * Walker helper, takes a single top block, will only walk the connected
     */
    static walkHelper (blocks, oneBlock) {
        var opcode = blocks.getOpcode(oneBlock)
        console.log(opcode)
        if (opcode.localeCompare("motion_movesteps")


    }

}
