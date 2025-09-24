module orit::trading {

    use std::signer;
    use std::vector;

    /// Structure to record a trade
    struct Trade has copy, drop, store {
        trader: address,
        amount_in: u64,
        amount_out: u64,
        profit_loss: u64,
    }

    /// Resource to store all trades for an account
    struct Trades has key {
        history: vector<Trade>,
    }

    /// Initialize trade history for a new account
    public entry fun init_account(account: &signer) {
        move_to(account, Trades { history: vector::empty<Trade>() });
    }

    /// Execute a trade and record P/L
    public entry fun execute_trade(
        account: &signer,
        amount_in: u64,
        amount_out: u64
    ) acquires Trades {
        let addr = signer::address_of(account);

        // Calculate profit/loss
        let pl = if (amount_out >= amount_in) {
            amount_out - amount_in
        } else {
            amount_in - amount_out // Store absolute loss
        };

        let trade = Trade {
            trader: addr,
            amount_in: amount_in,
            amount_out: amount_out,
            profit_loss: pl,
        };

        let trades_ref = borrow_global_mut<Trades>(addr);
        vector::push_back(&mut trades_ref.history, trade);
    }

    /// View trades for an account
    public fun get_trades(addr: address): vector<Trade> acquires Trades {
        borrow_global<Trades>(addr).history
    }
}
