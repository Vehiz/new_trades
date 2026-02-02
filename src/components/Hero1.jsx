import {
  LuBarChart3 as BarChart3,
  LuClock as Clock,
  LuDollarSign as DollarSign,
  LuShield as Shield,
  LuTrendingUp as TrendingUp,
  LuZap as Zap,
} from "react-icons/lu";

const Card = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

const Hero1 = () => {
  return (
    <section className="w-full py-12 sm:py-16 flex justify-center items-center overflow-hidden">
      <div className="mx-auto w-full max-w-7xl flex flex-col justify-center items-center px-4 sm:px-6 md:px-0">
        <div className="w-full max-w-3xl text-center leading-tight font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-8 sm:mb-12">
          <h2>What Bitcoin Mining Process Costs?</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 w-full">
          <Card className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900">
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
            </div>
            <CardContent className="relative rounded-2xl bg-white p-6 dark:bg-slate-900">
              <div className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 w-12 h-12 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/40 ring-4 ring-blue-500/10">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Auto-Trading</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Set your rules and let the system trade automatically around the clock,
                never missing an opportunity.
              </p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-2xl hover:shadow-green-500/10 dark:border-slate-800 dark:bg-slate-900">
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-green-500/10 blur-3xl" />
            </div>
            <CardContent className="relative rounded-2xl bg-white p-6 dark:bg-slate-900">
              <div className="rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 w-12 h-12 flex items-center justify-center mb-4 shadow-lg shadow-green-500/40 ring-4 ring-green-500/10">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Freeze Protection</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Intelligent system that pauses trading during price drops and
                automatically resumes when market recovers.
              </p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-500/10 dark:border-slate-800 dark:bg-slate-900">
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />
            </div>
            <CardContent className="relative rounded-2xl bg-white p-6 dark:bg-slate-900">
              <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 w-12 h-12 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/40 ring-4 ring-purple-500/10">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Charts</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Live price tracking with interactive charts to monitor your
                portfolio and market movements.
              </p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-yellow-200 hover:shadow-2xl hover:shadow-yellow-500/10 dark:border-slate-800 dark:bg-slate-900">
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-yellow-500/10 blur-3xl" />
            </div>
            <CardContent className="relative rounded-2xl bg-white p-6 dark:bg-slate-900">
              <div className="rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 w-12 h-12 flex items-center justify-center mb-4 shadow-lg shadow-yellow-500/40 ring-4 ring-yellow-500/10">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Deposits &amp; Withdrawals</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Seamlessly deposit and withdraw crypto with support for BTC, ETH,
                USDT, SOL, and more.
              </p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/10 dark:border-slate-800 dark:bg-slate-900">
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-indigo-500/10 blur-3xl" />
            </div>
            <CardContent className="relative rounded-2xl bg-white p-6 dark:bg-slate-900">
              <div className="rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 w-12 h-12 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/40 ring-4 ring-indigo-500/10">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Portfolio Management</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Track your holdings, profit/loss, and trading performance with
                comprehensive analytics.
              </p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/90 p-1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-2xl hover:shadow-cyan-500/10 dark:border-slate-800 dark:bg-slate-900">
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
            </div>
            <CardContent className="relative rounded-2xl bg-white p-6 dark:bg-slate-900">
              <div className="rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 w-12 h-12 flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/40 ring-4 ring-cyan-500/10">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trading History</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Complete transaction history with detailed records of all your
                trades and transfers.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero1;
