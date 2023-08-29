import { Link } from "gatsby"
import React from "react"
import { Fade } from "react-awesome-reveal"

const ProjectTable = ({
  architect,
  size,
  status,
  dateCompleted,
  awards,
  team,
  client,
  network,
  photoCredit,
  press,
  principal,
  projectLeader,
  interiorDesigner,
}) => {
  return (
    <div className="project-table-container">
      <div className="project-table-max-width">
        <Fade triggerOnce={true}>
          {architect && (
            <div>
              <hr className="faded-line"></hr>
              <div className="project-table-row">
                <p>Architect</p>
                <Link
                  to="/projects"
                  className="project-table-button"
                  state={{ architect: architect }}
                >
                  {architect}
                </Link>
              </div>
            </div>
          )}
          {interiorDesigner && (
            <div>
              <hr className="faded-line"></hr>
              <div className="project-table-row">
                <p>Interior Designer</p>
                <Link
                  to="/projects"
                  className="project-table-button"
                  state={{ interiorDesigner: interiorDesigner }}
                >
                  {interiorDesigner}
                </Link>
              </div>
            </div>
          )}
          {network && (
            <>
              {network.map((networkLink, index) => {
                const linkArray = networkLink.split(": ")
                return (
                  <div key={index}>
                    <hr className="faded-line"></hr>
                    <div className="project-table-row">
                      <p>{linkArray[0]}</p>
                      <Link
                        to="/projects"
                        className="project-table-button"
                        state={{ network: networkLink }}
                      >
                        {linkArray[1]}
                      </Link>
                    </div>
                  </div>
                )
              })}
            </>
          )}
          {size && (
            <div>
              <hr className="faded-line"></hr>
              <div className="project-table-row">
                <p>Size</p>
                <p>
                  {size.toLocaleString()} ft<sup>2</sup> /{" "}
                  {Math.round(size * 0.0929).toLocaleString()} m<sup>2</sup>
                </p>
              </div>
            </div>
          )}
          {status && (
            <div>
              <hr className="faded-line"></hr>
              <div className="project-table-row">
                <p>Status</p>
                <p>{status}</p>
              </div>
            </div>
          )}
          {dateCompleted && (
            <div>
              <hr className="faded-line"></hr>
              <div className="project-table-row">
                <p>Date Completed</p>
                <p>{new Date(dateCompleted).getFullYear()}</p>
              </div>
            </div>
          )}
          {awards && (
            <div>
              <hr className="faded-line"></hr>
              <div className="project-table-row">
                <p>Awards</p>
                <div className="project-table-awards">
                  {awards.map(award =>
                    award.link ? (
                      <a
                        key={award.id}
                        href={award.link}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {award.awardName}, {award.year}
                      </a>
                    ) : (
                      <Link key={award.id} to={`/awards#${award.year}`}>
                        {award.awardName}, {award.year}
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
          {press && (
            <div>
              <hr className="faded-line"></hr>
              <div className="project-table-row">
                <p>Press</p>
                <div className="project-table-awards">
                  {press.map(press => (
                    <a
                      key={press.id}
                      href={press.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {press.publication},{" "}
                      {new Date(press.publicationDate).getFullYear()}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
          {client && (
            <div>
              <hr className="faded-line"></hr>
              <div className="project-table-row">
                <p>Client</p>
                <div className="project-table-team">
                  {client.map((item, index) => (
                    <Link
                      to="/projects"
                      className="project-table-button"
                      key={index}
                      state={{ client: item }}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
          {principal && (
            <div>
              <hr className="faded-line"></hr>
              <div className="project-table-row">
                <p>Principal</p>
                <div className="project-table-team">
                  {principal.map(member => {
                    if (member.primaryOffice !== "No Longer Employed") {
                      return (
                        <Link
                          key={member.id}
                          to={`/team/${member.slug}`}
                          className="project-table-button"
                        >
                          {member.name}
                        </Link>
                      )
                    } else {
                      return null
                    }
                  })}
                  {principal.map(member => {
                    if (member.primaryOffice === "No Longer Employed") {
                      return <p key={member.id}>{member.name}</p>
                    } else {
                      return null
                    }
                  })}
                </div>
              </div>
            </div>
          )}
          {projectLeader && (
            <div>
              <hr className="faded-line"></hr>
              <div className="project-table-row">
                <p>Project Leader</p>
                <div className="project-table-team">
                  {projectLeader.map(member => {
                    if (member.primaryOffice !== "No Longer Employed") {
                      return (
                        <Link
                          key={member.id}
                          to={`/team/${member.slug}`}
                          className="project-table-button"
                        >
                          {member.name}
                        </Link>
                      )
                    } else {
                      return null
                    }
                  })}
                  {projectLeader.map(member => {
                    if (member.primaryOffice === "No Longer Employed") {
                      return <p key={member.id}>{member.name}</p>
                    } else {
                      return null
                    }
                  })}
                </div>
              </div>
            </div>
          )}
          {team && (
            <div>
              <hr className="faded-line"></hr>
              <div className="project-table-row">
                <p>Team</p>
                <div className="project-table-team">
                  {team.map(member => {
                    if (member.primaryOffice !== "No Longer Employed") {
                      return (
                        <Link
                          key={member.id}
                          to={`/team/${member.slug}`}
                          className="project-table-button"
                        >
                          {member.name}
                        </Link>
                      )
                    } else {
                      return null
                    }
                  })}
                  {team.map(member => {
                    if (member.primaryOffice === "No Longer Employed") {
                      return <p key={member.id}>{member.name}</p>
                    } else {
                      return null
                    }
                  })}
                </div>
              </div>
            </div>
          )}
          {photoCredit && (
            <div>
              <hr className="faded-line"></hr>
              <div className="project-table-row">
                <p>Photo Credit</p>
                <div className="project-table-awards">
                  {photoCredit.map((credit, index) => (
                    <p key={index}>{credit}</p>
                  ))}
                </div>
              </div>
            </div>
          )}
          <hr className="faded-line"></hr>
        </Fade>
      </div>
    </div>
  )
}

export default ProjectTable
