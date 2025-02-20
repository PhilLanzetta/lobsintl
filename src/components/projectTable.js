import { Link } from "gatsby"
import React from "react"
import { Fade } from "react-awesome-reveal"

const ProjectTable = ({
  size,
  designTeam,
  status,
  dateCompleted,
  year,
  awards,
  team,
  client,
  photoCredit,
  press,
  principal,
  projectLeader,
  sustainability,
}) => {
  return (
    <div className="project-table-container">
      <div className="project-table-max-width">
        <Fade triggerOnce={true}>
          {designTeam && (
            <>
              {designTeam.map(item => {
                return (
                  <div key={item.id}>
                    <hr className="faded-line"></hr>
                    <div className="project-table-row">
                      <p>{item.role}</p>
                      <Link
                        to="/projects"
                        className="project-table-button"
                        state={{ network: item.name }}
                      >
                        {item.name}
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
                <Link
                  className="project-table-button"
                  to="/projects"
                  state={{ statusFilter: [status] }}
                >
                  {status}
                </Link>
              </div>
            </div>
          )}
          {status === "Completed" && (
            <div>
              <hr className="faded-line"></hr>
              <div className="project-table-row">
                <p>Date Completed</p>
                <p>{year}</p>
              </div>
            </div>
          )}
          {sustainability && (
            <div>
              <hr className="faded-line"></hr>
              <div className="project-table-row">
                <p>Sustainability</p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: sustainability.childMarkdownRemark.html,
                  }}
                ></p>
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
                  <Link
                    to="/team/herve-descottes"
                    className="project-table-button"
                  >
                    Hervé Descottes
                  </Link>
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
