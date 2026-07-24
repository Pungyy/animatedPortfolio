import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";







export default function VisitsChart({

  activity = [],

}) {



  return (


    <div

      className="
        rounded-[32px]
        border
        border-zinc-800
        bg-zinc-900
        p-8
        shadow-lg
        shadow-black/20
      "

    >







      <h2

        className="
          text-xl
          font-semibold
          text-white
        "

      >

        Activité récente


      </h2>








      <p

        className="
          mt-1
          text-sm
          text-zinc-500
        "

      >

        Évolution des visites sur les derniers jours.


      </p>









      {

        activity.length === 0 ? (


          <div

            className="
              mt-10
              flex
              h-64
              items-center
              justify-center
              text-zinc-500
            "

          >

            Pas encore de données.


          </div>


        )


        :


        (


          <div

            className="
              mt-8
              h-72
              w-full
            "

          >


            <ResponsiveContainer

              width="100%"

              height="100%"

            >


              <LineChart

                data={
                  activity
                }

                margin={{

                  top:10,

                  right:20,

                  left:-20,

                  bottom:0,

                }}

              >



                <CartesianGrid

                  strokeDasharray="3 3"

                />





                <XAxis

                  dataKey="date"

                  tick={{
                    fill:"#71717a",
                    fontSize:12,
                  }}

                  axisLine={false}

                  tickLine={false}

                />








                <YAxis

                  allowDecimals={false}

                  tick={{
                    fill:"#71717a",
                    fontSize:12,
                  }}

                  axisLine={false}

                  tickLine={false}

                />








                <Tooltip

                  contentStyle={{

                    background:"#18181b",

                    border:
                      "1px solid #27272a",

                    borderRadius:"16px",

                    color:"#fff",

                  }}


                  labelStyle={{

                    color:"#a1a1aa",

                  }}


                />








                <Line


                  type="monotone"


                  dataKey="total"


                  stroke="#8b5cf6"


                  strokeWidth={3}


                  dot={{

                    r:4,

                    fill:"#8b5cf6",

                  }}


                  activeDot={{

                    r:7,

                  }}


                />





              </LineChart>


            </ResponsiveContainer>


          </div>


        )

      }



    </div>


  );


}